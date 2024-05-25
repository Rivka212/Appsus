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
                {isLongText && <a onClick={onToggleIsShowLong}>{isShowLong ? ' Less...' : ' More...'}</a>}
            </h4>
        </section>
    );
}