const EXTENSION_RULES = {
    'image/jpeg':       { default: '.jpg',  aliases: ['.jpeg', '.jpg', '.jpe', '.jfif'] },
    'image/png':        { default: '.png',  aliases: ['.png'] },
    'video/webm':       { default: '.webm', aliases: ['.webm'] },
    'video/mp4':        { default: '.mp4',  aliases: ['.mp4', '.m4v'] },
    'text/plain':       { default: '.txt',  aliases: ['.txt', '.text', '.log', '.dat'] },
    'application/json': { default: '.json', aliases: ['.json', '.dat'] }
    } ;

export function filename_resolver (type, user_input_name)
    {
    /**
     * Sanitizes user input and enforces appropriate file extensions.
     * Original code created by Google Gemini (October 28, 2026)
     * @param {string} type - The MIME type.
     * @param {string} user_input_name - The filename from the user.
     */

    // Trim the raw input so whitespace-only names are treated as empty.
    const trimmed_name = user_input_name.trim()

    // Fall back to a timestamped name when the user provided nothing.
    const fallback_name = `dataset_${Date.now ()}`
    const base_name = trimmed_name || fallback_name

    // Replace characters that break Windows/macOS filesystems (\ / : * ? " < > |) with underscores.
    const safe_name = base_name.replace (/[\\/:*?"<>|]/g, '_')

    // Make sure the the MIME type is lowercase
    const clean_mime = type.toLowerCase ()

    // Use the mapped rule, or a generic binary rule when the MIME type is unmapped.
    const rule = EXTENSION_RULES [clean_mime] || { default: '.dat', aliases: ['.dat', '.bin'] }

    // Check whether the user already supplied an acceptable extension.
    const lower_name = safe_name.toLowerCase ()
    const has_valid_extension = rule.aliases.some ((alias) => lower_name.endsWith (alias))

    // Append the default extension when it is missing or mismatched.
    let final_name = safe_name

    if  (! has_valid_extension)
        {
        final_name = `${safe_name}${rule.default}`
        }

    // Return the final name
    return final_name
    }
