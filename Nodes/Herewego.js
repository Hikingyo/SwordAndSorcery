/**
 * Created by hikingyo on 01/02/17.
 */

module.exports = {
	title: "Premier choix",
	narration: "Après avoir hésiter quelques instants entre retouner à l'auberge pour jouer aux dés avec tes comparses" +
	"et voir si la princesse vaut vraiment qu'on se mette en peine pour elle, le printemps aidant, te voilà de l'autre côté du pont levis.<br>" +
	"Tu franchis alors la herse d'un pas allègre, tel l'oisillon poussé par le vent pour pénétrer dans le vestibule du donjon, une large pièce sombre au relant de moisisure." +
	"En face de toi, un grand escalier mène vers le premier étages. De part et d'autre, des portes donnent sur des couloirs.<br>" +
	"Que vas-tu faire ?",
	useractions: [
		{
			type: "nextNode",
			target: "Unlongcouloir",
			image: "right_arrow.png"
		},
		{
			type: "nextNode",
			target: "Firstfloor",
			image: "up_arrow.png"
		},
		{
			type: "nextNode",
			target: "Unlongcouloir",
			image: "left_arrow.png"
		}
	]
};
