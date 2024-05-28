export function ColorInput({ onSetNoteColor, backgroundColor }) {
    console.log('backgroundColor:', backgroundColor)

    const colors = [
        '#FAAFA8',
        '#F39F76',
        '#FFF8B8',
        '#E2F6D3',
        '#B4DDD3',
        '#D4E4ED',
        '#AECCDC',
        '#D3BFDB',
        '#F6E2DD',
        '#E9E3D4',
        '#EFEFF1',
    ]

    function onSetColor(color) {
        const newColor = { backgroundColor: color }
        onSetNoteColor(newColor)
    }

    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${backgroundColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
        </section >
    )
}