
import { Card, CardContent, Typography, Rating, Button } from '@mui/material'
import imageCard from '../../../images/LogoCard.svg'
import Image from 'next/image'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocationOnIcon from '@mui/icons-material/LocationOn'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Card.module.scss'
import { URL_FULL } from '../../../services/config'


function Cards ({ idAccount, dataUser, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule }) {
  let val, ubication, hourCost, valDegree
  // console.log("datos completos", dataUser)
  // console.log('datos incompletos', name, lastname, degree, profileImage, description, role, evaluation, address, Schedule )
  if (evaluation > 6 || evaluation < 0 || !evaluation) val = 0
  else val = evaluation

  if (!profileImage) {
    profileImage = imageCard
  }

  if (!address) ubication = 'No disponible'
  else ubication = `${address.town}, ${address.state}`

  if (!Schedule) hourCost = 'No disponible'
  else hourCost = `$${parseInt(Schedule.costHour)}`

  if (!degree) valDegree = 'No disponible'
  else valDegree = degree

  // console.log(idAccount, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule)
  const src = `${profileImage}`
  const myLoader=({src})=>{
    return src
  }
  return (
    <Card className={styles.containerCard}>
      <div className={styles.headCard}>
        <div>
          <Image loader={myLoader} className={styles.imgCard} src={src} width={100} height={100} alt={name} />
        </div>

        <div className={styles.textHeadCard}>
          <div><strong>{name} {lastname}</strong></div>
          <div>{degree}</div>
          <Rating name='read-only' value={val} readOnly />
        </div>
      </div>

      <div className={styles.icons}>
        <div className={styles.divVideo}>
          <VideoCameraFrontIcon color='primary' className={styles.iconSpace} /> Consultoria Online

        </div>
        <div>
          <EmojiEventsIcon color='primary' className={styles.iconSpace} /> Especialista en:
          <div className={styles.textIcons}>
            {valDegree}
          </div>
        </div>
        <div>
          <LocalOfferIcon color='primary' className={styles.iconSpace} /> Precio de consultoría:
          <div className={styles.textIcons}>
            {hourCost}
          </div>
        </div>
        <div>
          <LocationOnIcon color='primary' className={styles.iconSpace} /> Dirección
          <div className={styles.textIcons}>
            {ubication}
          </div>
        </div>
      </div>

      <CardContent className={styles.textAboutMe}>
        <Typography variant='body1'><strong>Acerca de mí</strong></Typography>
        <Typography variant='body2'>
          {description}
        </Typography>
      </CardContent>
      <div className={styles.divButton}>
        <Link href={{
          pathname: '/principal/cita/[id]',
          query: { id: idAccount }
        }}
        >
          <Button
            className={styles.buttonCard}
          >AGENDAR CITA
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default Cards
