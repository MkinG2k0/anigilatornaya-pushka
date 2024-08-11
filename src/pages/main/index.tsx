import { generateNumber } from 'shared/lib/gen'
import { Button } from 'shared'

import { MdArrowForwardIos } from 'react-icons/md'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi2'
import { PiShareFat } from 'react-icons/pi'
import { CiStar } from 'react-icons/ci'

const data: ICard[] = [
	{
		title: 'ДЖУМА-МЕЧЕТЬ',
		description: 'ЦЕНТРАЛЬНАЯ ДЖУМА-МЕЧЕТЬ',
		image: 'https://edem-vit.by/wp-content/uploads/1-519.jpg',
		need: 1000,
		money: 356000,
	}, {
		title: 'Сердце Чечни',
		description: 'Мечеть «Сердце Чечни» имени Ахмата Кадырова',
		image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Мечеть_в_городе_Грозном_-_panoramio.jpg',
		money: 675000,
	}]

const Main = () => {
	return (
		<div className={'col-2 p-2 overflow-auto'}>
			<Banner/>
			{
				data.map((value) => <Card {...value}/>)
			}
		</div>
	)
}
const Banner = () => {
	return <div className={'bg-amber-600 text-white p-4 rounded col-2'}>
		<div className={'text-2xl'}>
			Текст по поводу курбан
		</div>
		<div className={'text-lg'}>
			непосредственное опписание
		</div>
	</div>
}

interface ICard {
	title: string
	description: string
	image?: string
	money?: number
	need?: number
}

const Card = ({description, image, money, need, title}: ICard) => {
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
				<Button className={'flex-auto text-lg font-bold'}>Помочь</Button>
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
