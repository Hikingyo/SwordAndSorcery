/**
 * Created by hikingyo on 23/01/17.
 */
module.exports = {
	title: "Ceci est ton amie",
	narration: "Un héro qui se respect porte toujours une épée à ces côtés. Heureusement, tu en aperçois une négligeament posée non loin de la porte du donjon.<br>" +
	"Clique sur l'épée pour la récupérer.",
	useractions: [
		{
			type: 'reward',
			reward: 'sword',
			target : 'Herewego',
			image: 'sword.png',
			title: 'Prendre'
		}
	]
};
