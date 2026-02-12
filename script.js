const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you actually going to say no?",
    "Pookie please...",
    "Please be serious and say yes...",
    "If you say no, I will be really sad...",
    "Think of the fun we’ll miss...",
    "Nooooooooooo...",
    "Okay, I’ll back off, I will give you some space...",
    "Just kidding, say yes please! ❤️",
    "Please? I’ll owe you a favor!"
];

let messageIndex = 0;

const gifImg = document.querySelector('.gif_container img');
const originalGifSrc = gifImg ? gifImg.src : '';

function toMediaGif(url) {
    try {
        const u = new URL(url);
        if (u.hostname.includes('giphy.com') && u.pathname.startsWith('/gifs/')) {
            const parts = u.pathname.split('-');
            const id = parts[parts.length - 1];
            return `https://media.giphy.com/media/${id}/giphy.gif`;
        }
    } catch (e) {}
    return url;
}

// Map specific messageIndex -> GIF URL
const gifsByIndex = {
    1: toMediaGif('https://giphy.com/gifs/suitsusanetwork-suits-usa-3oEdv4PjX0kCpWtS4o'),
    2: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHFrYndteGNqd25lbjE5aXJpcjR2OGpmZDc4NXJteHdoOGJiNW4zaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j6NxxNDz1DEF505s65/giphy.gif',
    3: toMediaGif('https://giphy.com/gifs/theoffice-the-office-tv-meeting-whQCarjn5Jv1Ktq2HH'), // 4th "No"
    4: 'https://media.giphy.com/media/i0xGuo4o5PutVo0imJ/giphy.gif', // 5th "No" (existing one)
    5: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW05YnN3eWxlenN3c3UyMzY1enBxZWU1eXB1NHViazVtdGpqeG1wbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y2tdaxOkw9QgQKUm8F/giphy.gif', // 6th "No"
    6: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExenN2NXh3Z2FodTJsNDl3ZWJ6am5qMnZ1NDQ1NWIyenRoZWUyYXQ0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JCPgKmNqI6js0Ct6b3/giphy.gif',
    7: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnQ5c2Rmdmh4MzR2cWNnZHB2aHN3dDR0a2hnbGduN2kxYnM1NTFubiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MAjVWxG6pFmSaGty4Q/giphy.gif',
    8: toMediaGif('https://giphy.com/gifs/potato-this-is-fine-mypotato-8zyppUPi4lIcplZxcI'),
    9: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW56eWhuYnNhMWtuNnlodnZrYjV5MHN1YTU3Y2Zxdmx1N3RtejY5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41m0cMfSj1JE2uwU/giphy.gif',
    10: toMediaGif('https://giphy.com/gifs/friends-why-ross-X4YqmJEl6wJoY'),
    0:'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjMzYzV2Nm9qNXl0ZDg2cDRpeWNnd2pjY2ljc3M0czViMGt2MDg4cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTneQi7THVXmi62Y/giphy.gif'
};

// Optional per-index width overrides (preserve aspect ratio). Keys are messageIndex values.
const gifsSizeByIndex = {
    0: '650px', // 3rd "No"
    1: '650px', // 4th "No"
    2: '650px', // 5th "No"
    3: '650px',  // 6th "No"
    4: '650px', // 7th "No"
    5: '650px', // 8th "No"
    6: '650px', // 9th "No"
    7: '650px', // 10th "No"
    8: '650px', // 11th "No"
    9: '650px', // 12th "No"
    10: '650px' // 13th "No"
};
const originalGifInlineWidth = gifImg ? gifImg.style.width : '';

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    if (gifImg) {
        const override = gifsByIndex[messageIndex];
        if (override) {
            gifImg.src = override;
            gifImg.alt = 'Alternate GIF';
            const sizeOverride = gifsSizeByIndex[messageIndex];
            if (sizeOverride) gifImg.style.width = sizeOverride;
            else gifImg.style.width = originalGifInlineWidth || '';
        } else {
            gifImg.src = originalGifSrc;
            gifImg.alt = 'Cute GIF';
            gifImg.style.width = originalGifInlineWidth || '';
        }
    }
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.4}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
