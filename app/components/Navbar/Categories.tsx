'use client';

import { TbBeach, TbMountain, TbPool} from "react-icons/tb"
import Container from "../Container"
import { 
    GiBarn, 
    GiBoatFishing, 
    GiCactus, 
    GiCastle, 
    GiCaveEntrance, 
    GiForestCamp, 
    GiIsland,
    GiWindmill
  } from 'react-icons/gi';
  import { FaSkiing } from 'react-icons/fa';
  import { BsSnow } from 'react-icons/bs';
  import { IoDiamond } from 'react-icons/io5';
  import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Praia',
        icon: TbBeach,
        description:'Essa propriedade é perto da praia!'
    },
    // {
    //     label: "Moinhos de Vento",
    //     icon: GiWindmill,
    //     description: "Este imóvel possui moinhos de vento encantadores!"
    // },
    {
        label: "Moderno",
        icon: MdOutlineVilla,
        description: "Este imóvel é moderno e sofisticado!"
    },
    {     
        label: "Campo",
        icon: TbMountain,
        description: "Este imóvel está localizado no campo, cercado pela natureza!"
    },
    {     
        label: "Piscinas",
        icon: TbPool,
        description: "Este imóvel possui uma bela piscina para desfrutar!"
    },
    {
        label: "Ilhas",
        icon: GiIsland,
        description: "Este imóvel está situado em uma ilha paradisíaca!"
    },
    {     
        label: "Lago",
        icon: GiBoatFishing,
        description: "Este imóvel está próximo a um lago deslumbrante!"
    },
    {     
        label: "Esqui",
        icon: FaSkiing,
        description: "Este imóvel oferece atividades de esqui para aproveitar!"
    },
    {     
        label: "Castelos",
        icon: GiCastle,
        description: "Este imóvel é um antigo castelo com uma história fascinante!"
    },
    {     
        label: "Cavernas",
        icon: GiCaveEntrance,
        description: "Este imóvel está situado em uma caverna misteriosa e encantadora!"
    },
    {    
        label: "Camping",
        icon: GiForestCamp,
        description: "Este imóvel oferece atividades de acampamento para relaxar e aproveitar a natureza!"
    },
    {
        label: "Ártico",
        icon: BsSnow,
        description: "Este imóvel está localizado em um ambiente ártico, rodeado de paisagens deslumbrantes!"
    },
    {
        label: "Deserto",
        icon: GiCactus,
        description: "Este imóvel está localizado no deserto, oferecendo uma experiência única e fascinante!"
    },
    {
        label: "Celeiro",
        icon: GiBarn,
        description: "Este imóvel está situado em um charmoso celeiro, proporcionando uma estadia aconchegante!"
    },
    {
        label: "Luxo",
        icon: IoDiamond,
        description: "Este imóvel é novo e luxuoso, oferecendo uma experiência de alto padrão!"
    }
]

const Categories = () => {
    const params = useSearchParams();

    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null
    }
  return (
    <Container>
        <div
            className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            "
        >
            {categories.map((item)=>(
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected = {category === item.label}
                    icon={item.icon}
                />    
            ))}
        </div>

    </Container>
  )
}

export default Categories