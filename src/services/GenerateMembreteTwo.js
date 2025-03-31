import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import divider from '../assets/divider.png'
import phoneIcon from '../assets/img/phone.png'
import mailIcon from '../assets/img/mail.png'
import webIcon from '../assets/img/web.png'
import cornerDecoration from '../assets/img/esquina.png'

class GenerateMembreteTwo {
  async membrete(urlPdf, urlLogo, phone, mail, web) {
    const existingPdfBytes = await fetch(urlPdf).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const logoBytes = await fetch(urlLogo).then((res) => res.arrayBuffer())
    const isPng = urlLogo.toLowerCase().endsWith('.png')
    const logoImage = isPng ? await pdfDoc.embedPng(logoBytes) : await pdfDoc.embedJpg(logoBytes)

    const pngDividerBytes = await fetch(divider).then((res) => res.arrayBuffer())
    const pngDivider = await pdfDoc.embedPng(pngDividerBytes)

    const pngCornerBytes = await fetch(cornerDecoration).then((res) => res.arrayBuffer())
    const pngCorner = await pdfDoc.embedPng(pngCornerBytes)

    const pngPhoneBytes = await fetch(phoneIcon).then((res) => res.arrayBuffer())
    const pngPhone = await pdfDoc.embedPng(pngPhoneBytes)

    const pngMailBytes = await fetch(mailIcon).then((res) => res.arrayBuffer())
    const pngMail = await pdfDoc.embedPng(pngMailBytes)

    const pngWebBytes = await fetch(webIcon).then((res) => res.arrayBuffer())
    const pngWeb = await pdfDoc.embedPng(pngWebBytes)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const iconSize = 16;

    firstPage.drawImage(logoImage, {
      x: 40,
      y: height - 80,
      width: 50,
      height: 50,
    })

    firstPage.drawImage(pngCorner, {
      x: width - 210,
      y: height - 210,
      width: 210,
      height: 210,
    })

    firstPage.drawImage(pngDivider, {
      x: 30,
      y: 65,
      width: width - 60,
      height: 0.5,
    })

    firstPage.drawImage(pngPhone, {
      x: 35,
      y: 35,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(phone, {
      x: 60,
      y: 40,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    firstPage.drawImage(pngMail, {
      x: width / 2 - 105,
      y: 35,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(mail, {
      x: width / 2 - 80,
      y: 40,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    firstPage.drawImage(pngWeb, {
      x: width - 205,
      y: 35,
      width: iconSize,
      height: iconSize,
    })
    firstPage.drawText(web, {
      x: width - 180,
      y: 40,
      size: 10,
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

export default new GenerateMembreteTwo()
