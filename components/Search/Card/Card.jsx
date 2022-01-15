
// import { URL_BASE } from '../../../services/config'
import { Card, CardContent, Typography, Rating, Button } from '@mui/material'
import imageCard from '../../../images/LogoCard.svg'
import Image from 'next/image'

function Cards ({ id, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule }) {
  let val
  if (evaluation > 6 || evaluation < 0 || !evaluation) val = 0
  else val = evaluation

  if (!profileImage) {
    profileImage = imageCard
  }
  console.log(id, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule)
  return (
    <Card className='containerCard'>
      <div className='headCard'>
        <div><Image className='imgCard' src={profileImage} alt={name} /></div>
        <div className='textHeadCard'>
          <div><strong>{name} {lastname}</strong></div>
          <div>{degree}</div>
          <Rating name='read-only' value={val} readOnly />
        </div>
      </div>

      <CardContent className='textAboutMe'>
        <Typography variant='body1'><strong>Acerca de mí</strong></Typography>
        <Typography variant='body2'>
          {description}
        </Typography>
      </CardContent>
      <div className='divButton'>
        <Button className='buttonCard '>AGENDAR CITA</Button>
      </div>
    </Card>
  )
}

export default Cards
