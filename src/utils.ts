

/**
 * Generates a consistent random color for a given category ID.
 * @param categoryId - The unique identifier for the category
 * @returns A hex color string (e.g., '#ef4444') from the predefined color palette
 */
export const getCategoryColor = (categoryId: string) => {
    const colors = [
        '#ef4444', // red-500
        '#3b82f6', // blue-500
        '#10b981', // emerald-500
        '#f59e0b', // amber-500
        // '#8b5cf6', // violet-500
        // '#ec4899', // pink-500
        // '#06b6d4', // cyan-500
        '#84cc16', // lime-500
        // '#f97316', // orange-500
        '#6366f1', // indigo-500
        // '#14b8a6', // teal-500
        // '#eab308', // yellow-500
        '#d946ef', // fuchsia-500
        // '#22c55e', // green-500
        // '#a855f7', // purple-500
        '#64748b', // slate-500
    ];

    // Create a simple hash from categoryId to ensure consistency
    let hash = 0;
    for (let i = 0; i < categoryId.length; i++) {
        const char = categoryId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Use absolute value and modulo to get a color index
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
};


export const simulateNetworkDelay = async (ms: number = 1000) => {
    await new Promise(resolve => setTimeout(resolve, ms));
};
