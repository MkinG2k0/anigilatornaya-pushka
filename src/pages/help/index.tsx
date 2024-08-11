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
		title: 'Строительство мечети в п. Чунском, Иркутской области',
		description: 'Строительство мечети в п. Чунском, Иркутской области',
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
