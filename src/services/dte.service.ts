import { supabase } from '@/lib/supabase'
import type { FacturaElectronica } from '@/data/types/dte-fe'
import type { ComprobanteCreditoFiscal } from '@/data/types/dte-ccf'

export interface SignDTERequest {
  dte: FacturaElectronica | ComprobanteCreditoFiscal
}

export interface SignDTEResponse {
  success: boolean
  signedDTE?: unknown
  error?: string
  details?: unknown
}

export const dteService = {
  async signDTE(dteData: FacturaElectronica | ComprobanteCreditoFiscal): Promise<SignDTEResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('sign-dte', {
        body: {
          dte: dteData
        }
      })

      if (error) {
        throw new Error(`Failed to sign DTE: ${error.message}`)
      }

      if (!data) {
        throw new Error('No response data from sign-dte function')
      }

      if (data.error) {
        throw new Error(data.error)
      }

      return {
        success: true,
        signedDTE: data.result || data
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

      return {
        success: false,
        error: errorMessage,
        details: error
      }
    }
  },

  validateDTE(dte: FacturaElectronica | ComprobanteCreditoFiscal): string[] {
    const errors: string[] = []

    if (!dte.identificacion) {
      errors.push('Missing identificacion section')
    }

    if (!dte.emisor) {
      errors.push('Missing emisor section')
    }

    if (!dte.cuerpoDocumento || dte.cuerpoDocumento.length === 0) {
      errors.push('Missing cuerpoDocumento items')
    }

    if (!dte.resumen) {
      errors.push('Missing resumen section')
    }

    if (dte.identificacion) {

      if (!dte.identificacion.numeroControl) {
        errors.push('Missing numeroControl in identificacion')
      }
    }

    return errors
  }
} 
