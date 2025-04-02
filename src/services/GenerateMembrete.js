import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import mailIcon from '@/assets/img/mail.png'
import phoneIcon from '@/assets/img/phone.png'
import webIcon from '@/assets/img/web.png'
import Rectagle from '../assets/img/rectagle.png'

class GenerateMembrete {
  async membrete(urlPdf, urlLogo, slogan, phone, mail, web) {
    const existingPdfBytes = await fetch(urlPdf).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Cargar imágenes
    const [jpgImageBytes, phoneIconBytes, mailIconBytes, webIconBytes, rectagleBytes] = await Promise.all([
      fetch(urlLogo).then((res) => res.arrayBuffer()),
      fetch(phoneIcon).then((res) => res.arrayBuffer()),
      fetch(mailIcon).then((res) => res.arrayBuffer()),
      fetch(webIcon).then((res) => res.arrayBuffer()),
      fetch(Rectagle).then((res) => res.arrayBuffer())
    ])

    const [jpgImage, phoneImg, mailImg, webImg, rectagleImg] = await Promise.all([
      pdfDoc.embedJpg(jpgImageBytes),
      pdfDoc.embedPng(phoneIconBytes),
      pdfDoc.embedPng(mailIconBytes),
      pdfDoc.embedPng(webIconBytes),
      pdfDoc.embedPng(rectagleBytes)
    ])

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const lengthSlogan = (slogan.length * 5) + 55;

    // Logo en la esquina superior izquierda
    firstPage.drawImage(jpgImage, {
      x: 30,
      y: height - 60,
      width: 50,
      height: 50,
    })

    // Eslogan en la esquina superior derecha
    firstPage.drawText(slogan, {
      x: width - lengthSlogan,
      y: height - 40,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    // Información de contacto en la parte inferior izquierda
    const iconSize = 16
    const textOffsetX = 25
    const startY = 50
    const iconX = 50

    // Teléfono
    firstPage.drawImage(phoneImg, {
      x: iconX,
      y: startY + 15,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(phone, {
      x: iconX + textOffsetX,
      y: startY + 18,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Correo
    firstPage.drawImage(mailImg, {
      x: iconX,
      y: startY -5,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(mail, {
      x: iconX + textOffsetX,
      y: startY,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Sitio web
    firstPage.drawImage(webImg, {
      x: iconX,
      y: startY - 24,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(web, {
      x: iconX + textOffsetX,
      y: startY - 20,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    //rectangulo
    firstPage.drawImage(rectagleImg, {
      x: iconX -10,
      y: startY - 30,
      width: 3,
      height: 65,
    })
    // Guardar PDF
    const pdfBytes = await pdfDoc.save()
    return this.#generateUrl(pdfBytes)
  }

  #generateUrl(pdfBytes) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    return URL.createObjectURL(blob)
  }
}

export default new GenerateMembrete()
