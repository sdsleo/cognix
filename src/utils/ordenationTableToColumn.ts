type SET_ORDER_PARAMS = {
  tableName: string,
  column: string
}

class OdernationTableWithBaseColumnSelected {
  setOrder({ column, tableName }: SET_ORDER_PARAMS) {
    sessionStorage.setItem(`@MDC@__${tableName}`, `${column}`)
  }

  getOrder(tableName: string) {
    return sessionStorage.getItem(`@MDC@__${tableName}`)
  }
}

export const odernationTableWithBaseColumnSelected = new OdernationTableWithBaseColumnSelected()