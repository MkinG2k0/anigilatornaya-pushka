import { Outlet } from 'react-router'
import { FC } from 'react'

import Toobalogonew from 'shared/icon/toobalogonew.svg'
import { Toaster } from 'shared/ui/toaster'
import { Button, NavBtn } from 'shared'

import { CiFolderOn, CiSquareChevDown, CiUser } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'
import { FaRegFolder } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { GoBell } from 'react-icons/go'

const Header = () => {
	return <div className={'row-2 items-center justify-between mb-2 p-2 mt-2'}>
		<div className={'row-2 items-center'}>
			<Toobalogonew/>
			<div className={'col'}>
				<div className={'font-bold flex'}>
					<div>15 чел</div>
					<div className={'w-1 h-1 rounded-full bg-green-500 '}></div>
				</div>
				<div className={'text-gray-700'}>помогают</div>
			</div>
		</div>
		<Button variant={'icon'}>
			<IoSearchOutline/>
		</Button>
	</div>
}

const Footer = () => {
	return <div className={'fixed bottom-0 row-2 p-2 px-4 justify-between items-center w-full '}>
		<NavBtn className={'col h-16'} to={''} variant={'ghost'}>
			<CiFolderOn className={'w-7 h-7'}/>
			<div>
				Сборы
			</div>
		</NavBtn>
		<NavBtn className={'col h-16'} to={''} variant={'ghost'}>
			<CiSquareChevDown className={'w-7 h-7'}/>
			<div>
				Завершенные
			</div>
		</NavBtn>
		<NavBtn className={'col h-16'} to={''} variant={'ghost'}>
			<GoBell className={'w-7 h-7'}/>
			<div>
				Уведомления
			</div>
		</NavBtn>
		<NavBtn className={'col h-16'} to={''} variant={'ghost'}>
			<CiUser className={'w-7 h-7'}/>
			<div>
				Профиль
			</div>
		</NavBtn>
	</div>
}

export const Layout: FC = () => {
	return (
		<div className={'relative w-[100dvw] h-[100dvh] overflow-hidden'}>
			<Header/>
			<Footer/>
			<Toaster/>
			
			<Outlet/>
		</div>
	)
}


