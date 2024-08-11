import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { Card } from 'pages/main'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'shared/ui/dialog'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Button } from 'shared'

import useWindowSize from 'react-use/lib/useWindowSize'
import OpenAI from 'openai'

const data = [
	{
		title: 'ДЖУМА-МЕЧЕТЬ',
		description: 'ЦЕНТРАЛЬНАЯ ДЖУМА-МЕЧЕТЬ',
		image: 'https://edem-vit.by/wp-content/uploads/1-519.jpg',
		need: 1000,
		money: '356 000',
	},
	{
		title: 'Сердце Чечни',
		description: 'Мечеть «Сердце Чечни» имени Ахмата Кадырова',
		image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Мечеть_в_городе_Грозном_-_panoramio.jpg',
		money: '675 000',
	},
	{
		title: 'Помощь малоимущим',
		description: '',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/9e4eb798-d371-4cdf-b4a6-7a5c6e74fe3c/Default_A_diverse_group_of_cartoon_characters_banding_together_1.jpg?w=512',
		money: '452 000',
	}, {
		title: 'Помощь в рамадан',
		description: 'Помощь проведения рамадана в бедных странах',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/1ccc5683-d095-4f11-a0c7-67378007ec1b/Default_A_diverse_group_of_cartoon_Muslim_characters_come_toge_2.jpg',
		money: '452 000',
	},
]

export const Help = () => {
	const {width, height} = useWindowSize()
	const [onHelp, setOnHelp] = useState(false)
	const [numberPeace, setNumberPeace] = useState(0)
	const [image, setImage] = useState('')

	const client = new OpenAI({
		apiKey: import.meta.env.VITE_OPENAI, // This is the default and can be omitted
		dangerouslyAllowBrowser: true,
	})

	async function main() {
		const params: OpenAI.Images.ImageGenerateParams = {
			prompt: 'Generate an original image-a lamb badge in the nft style. The whole lamb should be displayed in the picture, painted in an original way. The surface of the lamb can be covered with an interesting original ornament. A lamb should be sweet and sincere.',
			n: 1,  // Количество изображений, которые нужно сгенерировать
			size: '1024x1024',  // Размер изображения: 256x256, 512x512, 1024x1024
		}
		const chatCompletion = await client.images.generate(params)
		setImage(chatCompletion.data[0].url!)
	}

	useEffect(() => {
		main()
	}, [])

	useEffect(() => {
		let timer
		if (numberPeace > 0) {
			main()
			timer = setTimeout(() => {
				setNumberPeace(0)
				setOnHelp(false)
			}, 8000)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [numberPeace])

	return <div className={'col-2 p-2'}>
		{
			onHelp && <img className={'money'} src={image}/>
		}


		<Dialog>
			{
				data.map((value) => <Card {...value} key={value.title}/>)
			}
			<DialogContent className={'sm:max-w-[425px]'}>
				<DialogHeader>
					<DialogTitle>Помочь</DialogTitle>
				</DialogHeader>
				<div className={'grid gap-4 py-4'}>
					<div className={'grid grid-cols-4 items-center gap-4'}>
						<Label className={'text-right'} htmlFor={'name'}>
							Имя
						</Label>
						<Input
							className={'col-span-3'}
							defaultValue={'Тимур Айгумов'}
							id={'name'}
						/>
					</div>
					<div className={'grid grid-cols-4 items-center gap-4'}>
						<Label className={'text-right'} htmlFor={'username'}>
							Сумма
						</Label>
						<Input
							className={'col-span-3'}
							defaultValue={'100'}
							id={'username'}
							type={'number'}
						/>
					</div>
				</div>
				<DialogFooter
				>
					<DialogClose>
						<Button onClick={() => {
							setOnHelp(true)
							setNumberPeace(200)
						}}>Отправить</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
		<Confetti
			gravity={0.01}
			height={height}
			numberOfPieces={numberPeace}
			width={width}
		/>
	</div>
}
