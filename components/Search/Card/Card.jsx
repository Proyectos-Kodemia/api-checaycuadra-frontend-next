
import { URL_BASE } from '../../../services/config'
import { Card, CardContent, Typography, Rating, Button } from '@mui/material'
import imageCard from '../../../images/LogoCard.svg'
import Image from 'next/image'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Cards ({idAccount, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule }) {
  let val, ubication, hourCost, valDegree
  if (evaluation > 6 || evaluation < 0 || !evaluation) val = 0
  else val = evaluation

  if (!profileImage) {
    profileImage = imageCard
  }
 
  const router=useRouter()

  if (!address) ubication = 'No disponible'
  else ubication = `${address.town}, ${address.state}`

  if (!Schedule) hourCost = 'No disponible'
  else hourCost = `$${parseInt(Schedule.costHour)}`

  if (!degree) valDegree = 'No disponible'
  else valDegree = degree

  console.log(idAccount, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule)

 

  const handlerSendSpecificCard =()=>{
    
    // router.push({
    //   pathname:`${URL_BASE}/principal/Cita/[id]`,
    //   query:{id:id}
    // })



    
  }



  return (
    <Card className='containerCard'>
      
      <div className='headCard'>
        <div>
          <Image className='imgCard' src={profileImage} alt={name} />
        </div>

        <div className='textHeadCard'>
          <div><strong>{name} {lastname}</strong></div>
          <div>{degree}</div>
          <Rating name='read-only' value={val} readOnly />
        </div>
      </div>

      <div className='icons'>
        <div>
          <VideoCameraFrontIcon color='primary' /> Consultoria Online
        </div>
        <div>
          <EmojiEventsIcon color='primary' /> Especialista en:
          <div className='textIcons'>
            {valDegree}
          </div>
        </div>
        <div>
          <LocalOfferIcon color='primary' /> Precio de consultoría:
          <div className='textIcons'>
            {hourCost}
          </div>
        </div>
        <div>
          <LocationOnIcon color='primary' /> Dirección
          <div className='textIcons'>
            {ubication}
          </div>
        </div>
      </div>

      <CardContent className='textAboutMe'>
        <Typography variant='body1'><strong>Acerca de mí</strong></Typography>
        <Typography variant='body2'>
          {description}
        </Typography>
      </CardContent>
      <div className='divButton'>
        <Link href={{
          pathname:`${URL_BASE}/principal/cita/[id]`,
          query:{id:idAccount},
        }}
        >
        <Button 
        className='buttonCard '
        onClick={handlerSendSpecificCard}
        >AGENDAR CITA
        </Button>
        </Link>
      </div>
    </Card>
  )
}

export default Cards
