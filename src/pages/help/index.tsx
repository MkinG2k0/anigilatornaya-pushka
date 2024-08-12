import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { Card } from 'pages/main'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'shared/ui/dialog'
import { generateNumber } from 'shared/lib/gen'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Button } from 'shared'

import useWindowSize from 'react-use/lib/useWindowSize'

// const data = [
// 	{
// 		title: 'Строительство мечети в с.Барда Пермского края',
// 		description: 'Строительство мечети в с.Барда Пермского края',
// 		image: '/help/3.jpeg',
// 		money: '452 000',
// 		need: '800 000',
// 	},
// 	{
// 		title: 'Барашка',
// 		description: '',
// 		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fd29933b-c39c-4706-9f64-d87f999eb7b4/Default_a_lamb_in_a_cartoon_style_3.jpg',
// 		money: '20 000',
// 	}, {
// 		title: 'Корова',
// 		description: '',
// 		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/7f24e7ec-bded-48bf-b1b8-a8a04f4babbe/Default_a_cow_in_cartoon_style_1.jpg',
// 		money: '80 000',
// 	},
// 	{
// 		title: 'Верблюд',
// 		description: '',
// 		image: 'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/bc4937ad-5691-4ff8-974f-5c507fe652f1/Default_a_camel_in_cartoon_style_1.jpg',
// 		money: '135 000',
// 	},
// ]

const dataImage = [
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_0.jpg',
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_1.jpg',
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_2.jpg',
	'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/fbf9be2c-b783-4cfa-b49a-2be3016f8c0e/Default_Create_an_original_image_of_a_mosque_icon_in_a_network_3.jpg',
]

const dataBee = [
	'/money/1.jpg',
	'/money/2.jpg',
]

export const Help = () => {
	const {width, height} = useWindowSize()
	const [onHelp, setOnHelp] = useState(false)
	const [numberPeace, setNumberPeace] = useState(0)
	const [image, setImage] = useState('')
	const [type, setType] = useState('')

	const genImage = () => {
		console.log(type)
		if (type === 'Барашка') {
			setImage(dataBee[generateNumber(0, dataBee.length - 1)])
		} else {
			setImage(dataImage[generateNumber(0, dataImage.length - 1)])
		}
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
			<div className={'row-2 flex-wrap '}>
				{/*{*/}
				{/*	data.map((value) => <Card {...value} key={value.title} set={(value) => {*/}
				{/*		setType(value)*/}
				{/*	}}/>)*/}
				{/*}*/}
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
