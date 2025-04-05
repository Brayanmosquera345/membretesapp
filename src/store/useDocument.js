import { defineStore } from 'pinia'
import GenerateMembrete from '@/services/GenerateMembrete'
import GenerateMembreteTwo from '@/services/GenerateMembreteTwo'
import GenerateMembreteThree from '@/services/GenerateMembreteThree'

export const useDocument = defineStore('document', {
  state: () => ({
    urlDocument: '',
    urlDocumentEdit: '',
    infoDocument: {
      eslogan: '',
      web: '',
      logo: '',
      mail: '',
      phone: '',
    },
    nameLogo: '',
    nameDocument: '',
    selected: 'membrete1',
    error: false,
    messageError: '',
    tutorial: false,
  }),
  actions: {
    resetDocument() {
      this.urlDocumentEdit = this.urlDocument
    },

    selectedMembrete(membrete) {
      this.selected = membrete
      if (this.urlDocumentEdit !== '') {
        this.aplicarMembrete()
      }
    },

    async aplicarMembrete() {
      if (!this.urlDocument) {
        this.error = true
        this.messageError = 'Debes subir un PDF antes de aplicar el membrete.'
        return
      }

      // Validación antes de aplicar el membrete
      if (!this.validate(this.selected)) {
        return
      }

      let pdf
      switch (this.selected) {
        case 'membrete1':
          pdf = await GenerateMembrete.membrete(
            this.urlDocument,
            this.infoDocument.logo,
            this.infoDocument.eslogan,
            this.infoDocument.phone,
            this.infoDocument.mail,
            this.infoDocument.web
          )
          break
        case 'membrete2':
          pdf = await GenerateMembreteTwo.membrete(
            this.urlDocument,
            this.infoDocument.logo,
            this.infoDocument.phone,
            this.infoDocument.mail,
            this.infoDocument.web
          )
          break
        case 'membrete3':
          pdf = await GenerateMembreteThree.membrete(
            this.urlDocument,
            this.infoDocument.logo,
            this.infoDocument.phone,
            this.infoDocument.mail,
            this.infoDocument.web
          )
          break
        default:
          console.error('Membrete no válido')
          return
      }

      this.urlDocumentEdit = pdf
    },

    descargarPdf() {
      if (!this.urlDocumentEdit) {
        this.messageError = 'Debes seleccionar un documento para poder descargarlo'
        this.error = true
        return
      }
      const a = document.createElement('a')
      a.href = this.urlDocumentEdit
      a.download = this.nameDocument
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },

    validate(membrete) {
      if (
        this.infoDocument.logo === '' ||
        this.infoDocument.mail === '' ||
        this.infoDocument.phone === '' ||
        this.infoDocument.web === '' ||
        (membrete === 'membrete1' && this.infoDocument.eslogan === '')
      ) {
        this.messageError = 'Debes completar todos los campos para agregar el membrete.'
        this.error = true
        return false
      }

      // Si pasa la validación
      this.error = false
      this.messageError = ''
      return true
    },
  },
})
