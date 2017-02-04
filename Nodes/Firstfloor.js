/**
 * Created by hikingyo on 23/01/17.
 */
module.exports = {
	title: "Le sang et les larmes",
	narration: "Te voilà au premier étages du donjon dans une vaste salle encore plus sombre que la précédente.<br>" +
	"Un peu de lumière filtre malgrès tout à travers les planches qui bouchent les rares fenêtres. Suffisamtn pour que tu puisses voir que le sol et lesmurs sont recouvert d'étranges tâches noires qui resemblent  à s'y méprendre à du sang sécher." +
	"Mais, attend ... c'est du sang séché. Et il y en a partout, du sol au plafond, comme s'il y avais un concours de décapitation à la hâche émoussée.<br>" +
	"Comme si ...<br>" +
	"Tu commence à douter sérieusement de tes projets amoureux lorsque tu entends au loin des pleures.<br>" +
	"Ton sang ne fait qu'un tour, ou deux, tu empoignes ton épée fermement et te diriges vers la porte devant toi.",
	useractions: [
		{
			type: 'nextNode',
			reward: 'sword',
			target : 'Auloindescris',
			image: 'up_arrow.png',
			title: 'Prendre'
		}
	]
};
