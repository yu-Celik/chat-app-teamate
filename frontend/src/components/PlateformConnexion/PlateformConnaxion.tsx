import playstation from '../../assets/plateformes/playstation (1).svg'
import xbox from '../../assets/plateformes/xbox (1) (1).svg'
import steam from '../../assets/plateformes/Steam_icon_logo 2 (1).svg'
import epic from '../../assets/plateformes/epicGames (1).svg'
import riot from '../../assets/plateformes/riot (1).svg'
import twitch from '../../assets/plateformes/tic (1).svg'





export default function PlateformConnaxion() {
    return (
        <article
        className='w-full flex flex-col justify-center'
        >
            <h3
                className='text-slate-200'
            >
                Connexion :
            </h3>
            <div
                className='flex jc gap-2 w-full'
            >
                <img 
                className='w-10 h-10'
                src={playstation} 
                alt="playstation" 
                />
                <img 
                className='w-10 h-10'

                src={xbox} 
                alt="xbox" 
                />
                <img 
                className='w-10 h-10'
                src={steam} 
                alt="steam" 
                />
                <img 
                className='w-10 h-10'

                src={epic} 
                alt="epic" 
                />
                <img 
                className='w-10 h-10'

                src={riot} 
                alt="riot" 
                />
                <img 
                className='w-10 h-10'

                src={twitch} 
                alt="twitch" 
                />
            </div>

        </article>
    )
}