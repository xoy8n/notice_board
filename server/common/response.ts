export function successResponse<T>(data: T) {
    return {
        code: 'SUC001',
        message: '처리가 완료되었습니다.',
        data,
    };
}

export function errorResponse(code: string, message: string) {
    return {
        code,
        message,
        data: null,
    };
}

export function formatDate(d: Date | null | undefined) {
    if (!d) return null;
  
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Seoul',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(d).replace(' ', 'T');
  }