import Image from "next/image";
import styles from "@/styles/home.module.css"

const linkTo = [
    {
        title:"Car",
        path:"/car",
        img:"/assets/home/car.png"
    },
    {
        title:"Exchange",
        path:"/exchange",
        img:"/assets/home/event_upcoming.png"
    },
    {
        title:"Event",
        path:"/event",
        img:"/assets/home/shopping_bag.png"
    }
]

const donateLink = [
    {
        title:"Tree",
        path:"/donation/tree",
        img:"/assets/home/car.png"
    },
    {
        title:"Coral",
        path:"/donation/coral",
        img:"/assets/home/event_upcoming.png"
    },
    {
        title:"Transportation",
        path:"/donation/transportation",
        img:"/assets/home/shopping_bag.png"
    }
]

const HomePage = () => {
    return <div>
        <div className={styles.intro}>
            <p className={styles.introtext}>Calculate your emissions, reduce your 
                carbon footprint and support climate protection!</p>
        </div>
        <div className={styles.pathTo}>
            {linkTo.map((LINK, idx)=>(
                <a href= {LINK.path} key={idx} >
                    <Image src={LINK.img} height={80} width={90} alt={LINK.title} />
                    {LINK.title}
                </a>
            ))}
        </div>
        <p className={styles.donate}>Donation</p>
        <div className={styles.boxes}>
        <div className={styles.donateLogo}>
            {donateLink.map((LINK, idx)=>(
                <a href= {LINK.path} key={idx} >
                    <Image src={LINK.img} height={50} width={50} alt={LINK.title} />
                    {LINK.title}
                </a>
            ))}
        </div>

        </div>
    </div>
}
export default HomePage;