let io;
function init(serverIo) {
  io = serverIo;
}
function emitEventUpdate(event) {
  io?.emit('eventUpdate', event);
}
function emitTradeUpdate(trade) {
  io?.emit('tradeUpdate', trade);
}
module.exports = { init, emitEventUpdate, emitTradeUpdate };