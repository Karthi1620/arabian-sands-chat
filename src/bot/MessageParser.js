export default class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider
  }
  parse(message) {
    this.actionProvider.sendToBackend(message)
  }
}