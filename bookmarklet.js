javascript: (function () {

    const messages = [];

    function extractMessageDetails() {
        const phoneNumber = document.querySelector("#phoneNumber")?.innerText.trim() || "";
        const recvTime = document.querySelector("#recvTime")?.innerText.trim() || "";
        const msgContent = document.querySelector("#msgContent")?.innerText.trim() || "";
        messages.push({ phoneNumber, recvTime, msgContent });
    }

    function exportMessages() {
        const readFirstMessageButton = document.querySelector(".table-grid-icon[onclick*='doMsgRead(0)']");
        if (readFirstMessageButton) readFirstMessageButton.click();
        const nextMessageButton = document.querySelector("#msgNext");
        if (nextMessageButton) {
            if (nextMessageButton.classList.contains("next-icon-grey")) {
                downloadMessages();
                return;
            }
            extractMessageDetails();
            nextMessageButton.click();
            exportMessages();
        } else {
            setTimeout(exportMessages, 10);
        }
    }

    function generateFilename() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}_${month}_${day}_TP_LINK_MESSAGES.json`;
    }

    function downloadFile(url, filename) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function downloadMessages() {
        const filename = generateFilename();
        const jsonData = JSON.stringify(messages, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        downloadFile(url, filename);
    }

    exportMessages();

})();
