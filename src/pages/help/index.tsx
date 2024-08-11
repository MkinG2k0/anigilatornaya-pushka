import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { Card } from 'pages/main'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'shared/ui/dialog'
import { generateNumber } from 'shared/lib/gen'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Button } from 'shared'

import useWindowSize from 'react-use/lib/useWindowSize'
import OpenAI from 'openai'

const data = [
	{
		title: 'Строительство мечети в п. Чунском, Иркутской области',
		description: 'Строительство мечети в Иркутской области',
		image: '/help/1.jpeg',
		money: '252 000',
		need: '800 000',
	}, {
		title: 'Строительство мечети в г. Куртамыш',
		description: 'Строительство мечети в г. Куртамыш',
		image: '/help/2.jpeg',
		money: '523 000',
		need: '920 000',
	}, {
		title: 'Строительство мечети в с.Барда Пермского края',
		description: 'Строительство мечети в с.Барда Пермского края',
		image: '/help/3.jpeg',
		money: '452 000',
		need: '800 000',
	},
	{
		title: 'Барашка',
		description: '',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fd29933b-c39c-4706-9f64-d87f999eb7b4/Default_a_lamb_in_a_cartoon_style_3.jpg',
		money: '20 000',
	}, {
		title: 'Корова',
		description: '',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/7f24e7ec-bded-48bf-b1b8-a8a04f4babbe/Default_a_cow_in_cartoon_style_1.jpg',
		money: '80 000',
	},
	{
		title: 'Курица',
		description: '',
		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/634fc658-7bd5-4c63-97c9-93fed37c47eb/Default_chicken_in_cartoon_style_2.jpg',
		money: '5 000',
	},
]

const dataImage = [
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_0.jpg',
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_1.jpg',
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_2.jpg',
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_3.jpg',
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

	const genImage = () => {
		setImage(dataImage[generateNumber(0, dataImage.length - 1)])
	}
	useEffect(() => {
		// main()
	}, [])

	useEffect(() => {
		let timer
		if (numberPeace > 0) {
			// main()
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
			<div className={'row-2 flex-wrap overflow-y-auto'}>
				{
					data.map((value) => <Card {...value} key={value.title}/>)
				}
			</div>
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
							genImage()
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
