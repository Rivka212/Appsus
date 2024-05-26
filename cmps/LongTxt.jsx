const { useState } = React

export function LongTxt({ text, length = 100 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = text.length > length
    const textToShow = isShowLong ? text : text.substring(0, length)
    return (
        <section className="long-txt">
            <h4>
                {textToShow}
                <a onClick={onToggleIsShowLong}>{isShowLong ? '' : '...'}</a>
            </h4>
        </section>
    );
}