import { supabase } from '@/lib/supabase'
import type { FacturaElectronica } from '@/data/types/dte-fe'
import type { ComprobanteCreditoFiscal } from '@/data/types/dte-ccf'

export interface SignDTERequest {
  dte: FacturaElectronica | ComprobanteCreditoFiscal
  branchCode: string
  posCode: string
  documentType?: string
}

export interface SignDTEResponse {
  success: boolean
  signedDTE?: unknown
  controlNumber?: string
  error?: string
  details?: unknown
}

export const dteService = {
  async signDTE(
    dteData: FacturaElectronica | ComprobanteCreditoFiscal,
    branchCode: string,
    posCode: string,
    documentType: string = '01'
  ): Promise<SignDTEResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('sign-dte', {
        body: {
          dte: dteData,
          branchCode,
          posCode,
          documentType
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
        signedDTE: data.result || data,
        controlNumber: data.controlNumber
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

    // Note: numeroControl will be generated automatically by the sign-dte endpoint
    // so we don't need to validate it here anymore

    return errors
  }
} 
