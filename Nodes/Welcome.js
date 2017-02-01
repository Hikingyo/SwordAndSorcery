/**
 * Created by hikingyo on 18/01/17.
 */
module.exports = {
	title: "Bienvenue",
	narration: 'Bonjour à toi <em><%= userName %></em>.<br>' +
	"Te voici au porte d'une incroyable aventure. Bon, en fait d'aventure, te voici devant un donjon tout ce qu'il y de plus donjon.<br>" +
	"Des murs de pierre recouverts de mousse, un pont levis surplombant des douves boueuses, sans oublier les corbeaux qui survolent la haute tour en un cercle nonchalant.<br>" +
	"Et tu aurais bien raison de te demander ce que tu fais là , catapulté devant cet endroit sordide et peu engagent alors que tu as sans doute mieux à faire.<br>" +
	"Mais c'est sans savoir qu'il y a dans cette bâtisse une jeune femme éplorée retenue prisionnière par un infâme personnage qui n'attend que toi et ton courage pour" +
	"la délivré.<br>" +
	"Alors, en avant !!",
	useractions: [
		{
			type: 'nextNode',
			target: 'Getaweapon',
			image: 'right_arrow.png',
			title: 'En avant !!'
		}
	]
};
