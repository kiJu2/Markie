// content.ts

import TurndownService from "turndown"

const turndownService = new TurndownService()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message from background script:", message)
  console.log("Sender:", sender)
  if (message.action === "COPY_MARKDOWN") {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    const container = document.createElement("div")
    if (range) {
      container.appendChild(range.cloneContents())
    }

    const html = container.innerHTML
    console.log("Selected HTML:", html)

    const markdown = turndownService.turndown(html)
    console.log("Converted Markdown:", markdown)

    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        console.log("Markdown copied to clipboard:", markdown)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
    // Send a response back to the background script
    sendResponse({ status: "success", markdown })
  }
})

export {}
