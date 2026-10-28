const EXTENSION_RULES = {
    'image/jpeg':      { default: '.jpeg', aliases: ['.jpeg', '.jpg', '.jpe', '.jfif'] },
    'image/png':       { default: '.png',  aliases: ['.png'] },
    'video/webm':      { default: '.webm', aliases: ['.webm'] },
    'video/mp4':       { default: '.mp4',  aliases: ['.mp4', '.m4v'] },
    'text/plain':      { default: '.txt',  aliases: ['.txt', '.text', '.log', '.dat'] },
    'application/json': { default: '.json', aliases: ['.json', '.dat'] }
    };

export function filename_resolver (blob, user_input_name)
    {
    /**
     * Sanitizes user input and enforces appropriate file extensions.
     * Code written by Google Gemini (October 28, 2026)
     * @param {Blob} blob - The JavaScript Blob object.
     * @param {string} user_input_name - The raw string from the user text field.
     */

    // Trim the raw input so whitespace-only names are treated as empty.
    const trimmed_name = user_input_name.trim()

    // Fall back to a timestamped name when the user provided nothing.
    const fallback_name = `dataset_${Date.now ()}`
    const base_name = trimmed_name || fallback_name

    // Replace characters that break Windows/macOS filesystems (\ / : * ? " < > |) with underscores.
    const safe_name = base_name.replace (/[\\/:*?"<>|]/g, '_')

    // Extract the base MIME type, ignoring codec sub-parameters such as ";codecs=vp9".
    const mime_parts = blob.type.split (';')
    const clean_mime = mime_parts[0].toLowerCase ()

    // Use the mapped rule, or a generic binary rule when the MIME type is unmapped.
    const rule = EXTENSION_RULES[clean_mime] || { default: '.dat', aliases: ['.dat', '.bin'] }

    // Check whether the user already supplied an acceptable extension.
    const lower_name = safe_name.toLowerCase ()
    const has_valid_extension = rule.aliases.some ((alias) => lower_name.endsWith (alias))

    // Append the default extension when it is missing or mismatched.
    let final_name = safe_name

    if  (!has_valid_extension)
        {
        final_name = `${safe_name}${rule.default}`
        }

    // Trigger the browser download through a temporary anchor element.
    const url = URL.createObjectURL (blob)
    const link = document.createElement ('a')

    link.href = url
    link.download = final_name

    document.body.appendChild (link)
    link.click ()

    // Clean up the anchor and release the object URL to avoid leaking memory.
    document.body.removeChild (link)
    URL.revokeObjectURL (url)
    }
