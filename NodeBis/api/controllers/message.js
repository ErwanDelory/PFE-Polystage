// renvoie un message au format JSON. On a besoin de passer en paramètre
// res, la réponse que l'on envoie au client (Angular). Le paramètre
// data est un objet JavaScript. Globalement, cette fonction est
// équivalente au "echo json_encode(data);" que vous utilisiez en PHP
function sendMessage(res, data) {
	res.json({ status: "ok", data: data });
}

function sendError(res, reason) {
	res.json({ status: "error", data: { reason: reason } });
}

module.exports = { sendMessage, sendError };
