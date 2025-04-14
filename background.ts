// background.ts
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-markdown",
    title: "📝 Markie로 마크다운 복사",
    contexts: ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-markdown" && tab?.id != null) {
    chrome.tabs.sendMessage(tab.id, { action: "COPY_MARKDOWN" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError)
      } else {
        console.log("Response from content script:", response)
      }
    })
  }
})

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "CONVERT_TO_MD") {
//     const { html } = message
//     console.log("html:", html)
//     // const markdown = turndownService.turndown(html)

//     // console.log("Converted Markdown:", markdown)
//   }
// })

export {}
