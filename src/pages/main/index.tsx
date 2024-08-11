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

const data: IPlace[] = [
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

const Main = () => {
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
			prompt: 'Generate an original bull badge image in the nft style.',
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

	return (
		<div className={'col-2 p-2 overflow-auto'}>
			<Banner/>
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
								defaultValue={'Кама'}
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
	)
}
const Banner = () => {
	return <div className={'bg-[#453254] text-white  rounded row-2 justify-between items-center px-1'}>
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
	need?: number
	isDone?: boolean
}

interface ICard extends IPlace {
}

export const Card = ({description, image, money, need, isDone, title}: ICard) => {
	return <div className={'bg-white rounded overflow-hidden'}>
		<div className={'w-full h-18 relative'}>
			<img alt={''} className={'h-[220px] w-full object-cover '}
					 src={image}/>
			<div className={'teni absolute left-0 top-0 w-full h-full '}></div>
			<div className={'absolute left-0 top-0 flex justify-between text-white w-full p-2 items-center'}>
				<div className={'text-white text-xl '}>
					{title}
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
						<DialogTrigger asChild>
							<Button className={'flex-auto text-lg font-bold'}>Помочь</Button>
						</DialogTrigger>

				}

			</div>
			<div>
				<div className={'text-muted-foreground'}>
					собрали
				</div>
				<div className={'text-2xl font-bold text-accent'}>
					{money} ₽
				</div>
			</div>
			<div className={'text-xl font-bold '}>
				{description}
			</div>
			<div className={'w-full bg-gray-800 h-[1px]'}></div>
			<div className={'row-4 text-2xl justify-between h-10 items-center'}>
				<div className={'row-2'}>
					<HiOutlineUsers/>
					<div className={'text-xl'}>{generateNumber(10, 700)}</div>
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
							<div className={'absolute left-0 top-[-20px] bg-amber-600 w-10 h-10 rounded-full border-4 border-white'}></div>
							<div className={'absolute left-6 top-[-20px] bg-blue-600 w-10 h-10 rounded-full border-4 border-white'}></div>
							<div className={'absolute left-12 top-[-20px] bg-red-500 w-10 h-10 rounded-full border-4 border-white'}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Main
