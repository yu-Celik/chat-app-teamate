import valorant from './../../../../assets/imgGames/Valorant.jpeg';
import rocketLeague from '././../../../../assets/imgGames/rocket.jpg';
import fortnite from '././../../../../assets/imgGames/fornite.jpg';
export default function Activity() {
    return (
        <article
        className='flex flex-col gap-4 text-slate-200'
        >
            <h2>Activités récentes</h2>
            <div
            className='flex flex-col gap-4'
            >
                <div
                    className='flex items-center gap-2'
                >
                    <img
                        className='h-12 rounded'
                        src={valorant}
                        alt="Valorant" />
                    <p>10.5h les 15 derniers jours</p>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <img
                        className='h-12 rounded'

                        src={rocketLeague}
                        alt="Rocket League" />
                    <p>6.5h les 15 derniers jours</p>
                </div>
                <div
                    className='flex  items-center gap-2'
                >
                    <img
                        className='h-12 rounded'

                        src={fortnite}
                        alt="Fortnite" />
                    <p>1.5h les 15 derniers jours</p>
                </div>

            </div>
        </article>
    )
}