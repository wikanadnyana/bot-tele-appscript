const botHandle = "";
const botToken = "";
const appsScriptUrl = "";
const telegramApiUrl = `https://api.telegram.org/bot${botToken}`;

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    const chatId = contents.message.chat.id;
    const messageId = contents.message.message_id;
    const receivedTextMessage = contents.message.text || "";
    let messageReply = "";

    if (receivedTextMessage.toLowerCase() === "/start") {
      messageReply = `Halo! Bot App Script sudah dimulai`;
    } else if (
      receivedTextMessage.split("\n")[0].toLowerCase() === "/checkupdates"
    ) {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const rangeValues = sheet.getRange("A:A").getValues(); // Mengambil hanya kolom pertama

      const previousValues = JSON.parse(
        PropertiesService.getScriptProperties().getProperty("previousValues") ||
          "[]"
      );

      const updatedValues = rangeValues.map((row, rowIndex) => {
        const cell = row[0];
        const previousValue = previousValues[rowIndex]
          ? previousValues[rowIndex][0]
          : "";
        if (cell.toString() !== previousValue) {
          previousValues[rowIndex] = previousValues[rowIndex] || [];
          previousValues[rowIndex][0] = cell.toString();
          return cell.toString();
        } else {
          return null;
        }
      });

      PropertiesService.getScriptProperties().setProperty(
        "previousValues",
        JSON.stringify(previousValues)
      );

      const updatedValuesFiltered = updatedValues.filter(
        (value) => value !== null
      );

      if (updatedValuesFiltered.length > 0) {
        messageReply = updatedValuesFiltered.join("\n");
      } else {
        messageReply = "Tidak ada pembaruan :(";
      }
    }

    sendTelegramMessage(chatId, messageId, messageReply);
  } catch (err) {
    Logger.log(err.toString());
  }
}

function sendTelegramMessage(chatId, replyToMessageId, textMessage) {
  const url = `${telegramApiUrl}/sendMessage`;

  const data = {
    parse_mode: "HTML",
    chat_id: chatId,
    reply_to_message_id: replyToMessageId,
    text: textMessage,
    disable_web_page_preview: true,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(data),
  };

  const response = UrlFetchApp.fetch(url, options).getContentText();
  return response;
}

function setWebhook() {
  const url = `${telegramApiUrl}/setWebhook?url=${appsScriptUrl}`;
  const response = UrlFetchApp.fetch(url).getContentText();

  Logger.log(response);
}
