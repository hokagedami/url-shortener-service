if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}



const disableResultView = () => {
    let result = document.getElementById('result')
    if (result) {
        result.style.display = 'none'
    }
}

async function copyToClipboard() {
    /* Get the text field */
    const copyText = document.getElementById("shortenurl");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    await navigator.clipboard.writeText(copyText.value)
    const balloon = document.getElementById("balloon");
    balloon.style.display = 'block'
}