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
	return <div className={' bottom-0 row-2 p-2 px-4 justify-between items-center w-full bg-gray-100'}>
		<NavBtn className={'col h-16'} to={'/'} variant={'ghost'}>
			<CiFolderOn className={'w-7 h-7'}/>
			<div>
				Сборы
			</div>
		</NavBtn>
		<NavBtn className={'col h-16'} to={'/completed'} variant={'ghost'}>
			<CiSquareChevDown className={'w-7 h-7'}/>
			<div>
				Завершенные
			</div>
		</NavBtn>
		<NavBtn className={'col h-16'} to={'/notifications'} variant={'ghost'}>
			<GoBell className={'w-7 h-7'}/>
			<div>
				Уведомления
			</div>
		</NavBtn>
		<NavBtn className={'col h-16'} to={'/profile'} variant={'ghost'}>
			<CiUser className={'w-7 h-7'}/>
			<div>
				Профиль
			</div>
		</NavBtn>
	</div>
}

export const Layout: FC = () => {
	return (
		<div className={'w-[100dvw] h-[100dvh] overflow-hidden col'}>
			<Header/>
			<div className={'flex-auto overflow-auto'}>
				<Outlet/>
			</div>
			<Footer/>

			<Toaster/>
		</div>
	)
}


