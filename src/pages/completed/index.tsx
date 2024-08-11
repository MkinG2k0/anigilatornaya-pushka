import { Card } from 'pages/main'

import { Dialog } from 'shared/ui/dialog'

const data: any[] = [
	{
		title: 'Помощь малоимущим',
		description: 'Помощь малоимущим',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/9e4eb798-d371-4cdf-b4a6-7a5c6e74fe3c/Default_A_diverse_group_of_cartoon_characters_banding_together_1.jpg?w=512',
		isDone: true,
		money: '226 000',
	}, {
		title: 'Помощь в рамадан',
		description: 'Помощь проведения рамадана в бедных странах',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/1ccc5683-d095-4f11-a0c7-67378007ec1b/Default_A_diverse_group_of_cartoon_Muslim_characters_come_toge_2.jpg',
		isDone: true,
		money: '452 000',
	},
]

export const Completed = () => {
	return <div className={'col-2 p-2'}>
		<div>
			<div className={'text-xl'}>
				Завершенные
			</div>
		</div>
		<Dialog>
			<div className={'row-2 flex-wrap overflow-y-auto'}>
				{
					data.map((value) => <Card {...value} key={value.title}/>)
				}
			</div>
		</Dialog>
	</div>
}
