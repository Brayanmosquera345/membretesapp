import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import divider from '../assets/divider.png'
import phoneIcon from '../assets/img/phone.png'
import emailIcon from '../assets/img/mail.png'
import webIcon from '../assets/img/web.png'
import footerImage from '../assets/footer.png'

class GenerateMembreteThree {
  async membrete(urlPdf, urlLogo, phone, mail, web) {
    const existingPdfBytes = await fetch(urlPdf).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Determinar si la imagen del logo es PNG o JPG
    const logoResponse = await fetch(urlLogo)
    const logoBuffer = await logoResponse.arrayBuffer()
    const logoType = urlLogo.toLowerCase().endsWith('.png') ? 'png' : 'jpg'

    const logoImage = logoType === 'png'
      ? await pdfDoc.embedPng(logoBuffer)
      : await pdfDoc.embedJpg(logoBuffer)

    const dividerImgBytes = await fetch(divider).then((res) => res.arrayBuffer())
    const dividerPng = await pdfDoc.embedPng(dividerImgBytes)

    const footerImgBytes = await fetch(footerImage).then((res) => res.arrayBuffer())
    const footerPng = await pdfDoc.embedPng(footerImgBytes)

    const phoneIconBytes = await fetch(phoneIcon).then((res) => res.arrayBuffer())
    const phonePng = await pdfDoc.embedPng(phoneIconBytes)

    const emailIconBytes = await fetch(emailIcon).then((res) => res.arrayBuffer())
    const emailPng = await pdfDoc.embedPng(emailIconBytes)

    const webIconBytes = await fetch(webIcon).then((res) => res.arrayBuffer())
    const webPng = await pdfDoc.embedPng(webIconBytes)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Dibujar Logo centrado en la parte superior
    const logoSize = 60
    firstPage.drawImage(logoImage, {
      x: (width - logoSize) / 2,
      y: height - logoSize - 20,
      width: logoSize,
      height: logoSize,
    })

    // Dibujar línea divisora superior
    firstPage.drawImage(dividerPng, {
      x: 30,
      y: 75,
      width: width - 60,
      height: 0.5,
    })

    // Dibujar footer negro en la parte inferior
    firstPage.drawImage(footerPng, {
      x: 0,
      y: 0,
      width: width,
      height: 40,
    })

    // Posición inicial para los iconos y textos
    const iconSize = 16
    const textSize = 10
    let textY = 50
    const iconX = 30
    const textX = iconX + iconSize + 5

    // Dibujar icono de teléfono
    firstPage.drawImage(phonePng, {
      x: iconX,
      y: textY,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(phone, {
      x: textX,
      y: textY + 3,
      size: textSize,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Dibujar icono de email
    firstPage.drawImage(emailPng, {
      x: width / 2 - 105,
      y: textY,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(mail, {
      x: width / 2 - 80,
      y: textY + 3,
      size: textSize,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Dibujar icono de web
    firstPage.drawImage(webPng, {
      x: width - 205,
      y: textY,
      width: iconSize,
      height: iconSize,
    })

    firstPage.drawText(web, {
      x: width - 180,
      y: textY + 3,
      size: textSize,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    const pdfBytes = await pdfDoc.save()
    return this.#generateUrl(pdfBytes)
  }

  #generateUrl(pdfBytes) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    return URL.createObjectURL(blob)
  }
}

export default new GenerateMembreteThree()
