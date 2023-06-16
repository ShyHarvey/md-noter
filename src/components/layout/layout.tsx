import { type FC, type PropsWithChildren } from 'react'
import { Header } from './Header/header'
import { Drawer } from '../drawer'


export const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {

    return (
        <div className='min-h-screen'>
            <Drawer>
                <Header />
            </Drawer>
            <div className='flex-1 py-4'>
                {children}
            </div>

            {/* <Footer /> */}
        </div>
    )
}