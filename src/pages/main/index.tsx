import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from 'shared/ui/dialog'
import { generateNumber } from 'shared/lib/gen'
import { Input } from 'shared/ui/input'
import { Label } from 'shared/ui/label'
import { Button } from 'shared'

import useWindowSize from 'react-use/lib/useWindowSize'
import { MdArrowForwardIos } from 'react-icons/md'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi2'
import { PiShareFat } from 'react-icons/pi'
import { CiStar } from 'react-icons/ci'
import OpenAI from 'openai'
import axios from 'axios'

const data: IPlace[] = [
	{
		title: 'Рука помощи бездомным животным',
		description: 'Для лечения и восстановления животных в приюте необходим специальный корм',
		image: 'photo_2024-08-11_22-45-03.jpg',
		need: '61 812',
		money: '2 898',
		type: 'dogs',
	},
	{
		title: 'Спина бифида',
		description: 'Приёмным семьям и потенциальным усыновителям детей со спина бифида необходимы консультации психолога!',
		image: 'photo_2024-08-11_22-45-00.jpg',
		money: '131 799',
		need: '335 539',
		type: 'child',
	},
	{
		title: 'Желтый аист',
		description: 'Лена – сирота. Малышке нужны помощь и сопровождение няни на время лечения в больнице!',
		image: 'photo_2024-08-11_22-44-53.jpg',
		money: '4 098',
		need: '92 927',
		type: 'child',
	},
	{
		title: 'Провидение',
		description: 'У Аноры ретинопатия. Ей нужна операция, чтобы не потерять зрение',
		image: '5.jpg',
		money: '199 369',
		need: '273 523',
		type: 'child',
	},
]

const Main = () => {
	const {width, height} = useWindowSize()
	const [onHelp, setOnHelp] = useState(false)
	const [numberPeace, setNumberPeace] = useState(0)
	const [image, setImage] = useState('')
	const [type, setType] = useState('')

	const onGen = () => {
		const num = generateNumber(0, 7)
		setImage(`/help/${type}/${num}.jfif`)
	}

	useEffect(() => {
		let timer
		if (numberPeace > 0) {
			// giga()
			timer = setTimeout(() => {
				setNumberPeace(0)
				setOnHelp(false)
			}, 5000)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [numberPeace])

	return (
		<div className={'col-2 p-2 '}>
			{
				onHelp && <img className={'money'} src={image}/>
			}


			<Dialog>
				<div className={'row-2 flex-wrap overflow-y-auto'}>
					{
						data.map((value) => <Card {...value} key={value.title} set={setType}/>)
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
								onGen()
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
	)
}
const Banner = () => {
	const nav = useNavigate()
	return <div className={'bg-[#453254] text-white  rounded row-2 justify-between items-center px-1'} onClick={() => {
		nav('/help')
	}}>
		<div className={'col p-4'}>
			<div className={'text-2xl'}>
				Пожертвование
			</div>
			<div className={'text-lg'}>
				в честь месяца рамадан
			</div>
		</div>
		<img className={'w-20 h-20 object-contain'}
				 src={'https://cdn.leonardo.ai/users/7eed60b5-bb28-4022-9a1e-739aa1ca9674/generations/3f4e1d10-08d9-4aad-9f14-bc0109b5df3a/Default_vector_icon_on_the_background_of_the_upcoming_holiday_2.jpg'}/>
	</div>
}

interface IPlace {
	title: string
	description: string
	image?: string
	money?: number | string
	need?: number | string
	isDone?: boolean
	type: string
}

interface ICard extends IPlace {
	set?(value: string): void
}

const randomColors = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export const Card = ({description, image, money, need, isDone, title, type, set}: ICard) => {
	return <div className={'bg-white rounded overflow-hidden flex-auto w-[clamp(400px,40%,500px)]'}>
		<div className={'w-full h-18 relative'}>
			<img alt={''} className={'h-[220px] w-full object-cover '}
					 src={image}/>
			<div className={'teni absolute left-0 top-0 w-full h-full '}></div>
			<div className={'absolute left-0 top-0 flex justify-between text-white w-full p-2 items-center'}>
				<div className={'row-2 items-center'}>
					<div className={'w-10 h-10 rounded-full'} style={{background: randomColors()}}></div>
					<div className={'text-white text-xl break-words'}>
						{title}
					</div>
				</div>
				<CiStar className={'w-8 h-8'}/>
			</div>
		</div>
		<div className={'col-2 p-3'}>
			<div className={'row-2 '}>
				<Button className={'row-2 text-md'} variant={'secondary'}>
					<PiShareFat/>
					<div>
						Поделиться
					</div>
				</Button>

				{
					isDone ? <div className={'flex-auto row items-center bg-gray-200 rounded-full  justify-between'}>
							<div className={'px-3 flex-auto text-center'}>Сбор</div>
							<Button className={'flex-auto'}>Отчет</Button>
						</div> :
						<DialogTrigger asChild onClick={() => set?.(type)}>
							<Button className={'flex-auto text-lg font-bold'}>Помочь</Button>
						</DialogTrigger>

				}

			</div>
			<div className={'row justify-between'}>
				{need
					&&
					<div className={'col'}>
						<div className={'text-muted-foreground'}>
							нужно
						</div>
						<div className={'text-2xl font-bold text-accent'}>
							{need} ₽
						</div>
					</div>
				}
				<div className={'col'}>
					<div className={'text-muted-foreground'}>
						собрали
					</div>
					<div className={'text-2xl font-bold text-accent'}>
						{money} ₽
					</div>
				</div>
			</div>
			<div className={'text-xl font-bold '}>
				{description}
			</div>
			<div className={'w-full bg-gray-800 h-[1px]'}></div>
			<div className={'row-2 text-2xl justify-between h-10 items-center'}>
				<div className={'row-2'}>
					<HiOutlineUsers/>
					<div className={'text-xl'}>{generateNumber(10, 99)}</div>
					<div className={'h-6 w-[1px] bg-gray-800'}></div>
					<AiOutlineMessage/>
					<div className={'text-xl'}>{generateNumber(10, 99)}</div>

				</div>
				<div>
					<div className={'text-lg text-muted-foreground row items-center '}>
						<div>
							Комментарии
						</div>
						<MdArrowForwardIos/>
						<div className={'relative w-20'}>
							<div className={'absolute left-0 top-[-20px] bg-amber-600 w-10 h-10 rounded-full border-4 border-white'}
									 style={{background: randomColors()}}></div>
							<div className={'absolute left-6 top-[-20px] bg-blue-600 w-10 h-10 rounded-full border-4 border-white'}
									 style={{background: randomColors()}}></div>
							<div className={'absolute left-12 top-[-20px] bg-red-500 w-10 h-10 rounded-full border-4 border-white'}
									 style={{background: randomColors()}}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Main
