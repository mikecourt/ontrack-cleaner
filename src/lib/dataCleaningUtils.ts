// Data cleaning utility functions

export const consolidatePhoneNumbers = (record: any) => {
  let consolidated = false;
  const newRecord = { ...record };
  
  if (!newRecord.PHONE || newRecord.PHONE === '') {
    if (newRecord.PHONE2) {
      newRecord.PHONE = newRecord.PHONE2;
      newRecord.PHONE2 = null;
      consolidated = true;
    } else if (newRecord.PHONE3) {
      newRecord.PHONE = newRecord.PHONE3;
      newRecord.PHONE3 = null;
      consolidated = true;
    } else if (newRecord.FAX) {
      newRecord.PHONE = newRecord.FAX;
      newRecord.FAX = null;
      consolidated = true;
    }
  }
  
  const additionalPhones = [];
  if (newRecord.PHONE2) additionalPhones.push(newRecord.PHONE2);
  if (newRecord.PHONE3) additionalPhones.push(newRecord.PHONE3);
  if (newRecord.FAX) additionalPhones.push(newRecord.FAX);
  
  if (additionalPhones.length > 0) {
    newRecord.ADDITIONAL_PHONE = additionalPhones.join(',');
  } else {
    newRecord.ADDITIONAL_PHONE = null;
  }
  
  return { record: newRecord, consolidated };
};

export const formatDate = (dateValue: any): string | null => {
  if (!dateValue) return null;
  
  try {
    let date: Date;
    
    if (typeof dateValue === 'number') {
      const excelEpoch = new Date(1899, 11, 30);
      date = new Date(excelEpoch.getTime() + dateValue * 86400000);
    }
    else if (dateValue instanceof Date) {
      date = dateValue;
    }
    else if (typeof dateValue === 'string') {
      const dateStr = dateValue.trim();
      
      if (/^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/.test(dateStr)) {
        date = new Date(dateStr);
      }
      else if (/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}/.test(dateStr)) {
        date = new Date(dateStr);
      }
      else if (/^\d{1,2}[-\/]\d{1,2}[-\/]\d{2}$/.test(dateStr)) {
        const parts = dateStr.split(/[-\/]/);
        const year = parseInt(parts[2]);
        const fullYear = year < 50 ? 2000 + year : 1900 + year;
        date = new Date(fullYear, parseInt(parts[0]) - 1, parseInt(parts[1]));
      }
      else {
        date = new Date(dateStr);
      }
    }
    else {
      return null;
    }
    
    if (isNaN(date.getTime())) {
      return null;
    }
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  } catch (error) {
    return null;
  }
};

export const cleanPhoneNumber = (phone: any): string => {
  if (!phone) return phone;
  const digits = String(phone).trim().replace(/\D/g, '');
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits[0] === '1') return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return String(phone).trim();
};

export const getPhoneDigits = (phone: any): string | null => {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : null;
};

export const normalizeAddressForMatching = (address: any): string | null => {
  if (!address) return null;
  return String(address).toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ')
    .replace(/\bstreet\b/g, 'st').replace(/\bdrive\b/g, 'dr').replace(/\bavenue\b/g, 'ave')
    .replace(/\bcircle\b/g, 'cir').replace(/\bcourt\b/g, 'ct').replace(/\blane\b/g, 'ln').replace(/\broad\b/g, 'rd').trim();
};

export const normalizeState = (state: any): string => {
  if (!state) return state;
  const stateStr = String(state).trim().toUpperCase();
  
  const stateMappings: Record<string, string> = {
    'C0': 'CO',
    'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR', 'CALIFORNIA': 'CA',
    'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
    'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA',
    'KANSAS': 'KS', 'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
    'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS', 'MISSOURI': 'MO',
    'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
    'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH',
    'OKLAHOMA': 'OK', 'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
    'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
    'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY',
    'DISTRICT OF COLUMBIA': 'DC', 'PUERTO RICO': 'PR', 'GUAM': 'GU', 'VIRGIN ISLANDS': 'VI',
  };
  
  return stateMappings[stateStr] || stateStr;
};

export const normalizeZip = (zip: any): string => {
  if (!zip) return zip;
  const zipStr = String(zip).trim();
  if (/^\d{5}(-\d{4})?$/.test(zipStr)) return zipStr;
  const digits = zipStr.replace(/\D/g, '');
  if (digits.length === 9) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  if (digits.length === 5) return digits;
  return zipStr;
};

export const mergeRecords = (record1: any, record2: any) => {
  const merged = { ...record1 };
  Object.keys(record2).forEach(key => {
    if (record2[key] !== null && record2[key] !== undefined && record2[key] !== '') {
      if (!merged[key] || merged[key] === '') merged[key] = record2[key];
    }
  });
  return merged;
};

export const findAndMergeDuplicates = (data: any[]) => {
  const phoneMap = new Map<string, number[]>();
  const addressMap = new Map<string, number[]>();
  
  data.forEach((record, index) => {
    const phoneDigits = getPhoneDigits(record.PHONE);
    if (phoneDigits) {
      if (!phoneMap.has(phoneDigits)) phoneMap.set(phoneDigits, []);
      phoneMap.get(phoneDigits)!.push(index);
    }
    
    const normalizedAddress = normalizeAddressForMatching(record.ADDRESS);
    const zip = record.ZIP ? String(record.ZIP).split('-')[0] : null;
    if (normalizedAddress && zip) {
      const addressKey = `${normalizedAddress}|${zip}`;
      if (!addressMap.has(addressKey)) addressMap.set(addressKey, []);
      addressMap.get(addressKey)!.push(index);
    }
  });
  
  const processed = new Set<number>();
  const result = [];
  let duplicatesFound = 0;
  
  data.forEach((record, index) => {
    if (processed.has(index)) return;
    
    const duplicateIndices = new Set<number>();
    const phoneDigits = getPhoneDigits(record.PHONE);
    if (phoneDigits && phoneMap.has(phoneDigits)) {
      phoneMap.get(phoneDigits)!.forEach(idx => {
        if (idx !== index && !processed.has(idx)) duplicateIndices.add(idx);
      });
    }
    
    const normalizedAddress = normalizeAddressForMatching(record.ADDRESS);
    const zip = record.ZIP ? String(record.ZIP).split('-')[0] : null;
    if (normalizedAddress && zip) {
      const addressKey = `${normalizedAddress}|${zip}`;
      if (addressMap.has(addressKey)) {
        addressMap.get(addressKey)!.forEach(idx => {
          if (idx !== index && !processed.has(idx)) duplicateIndices.add(idx);
        });
      }
    }
    
    if (duplicateIndices.size > 0) {
      let mergedRecord = { ...record };
      duplicateIndices.forEach(dupIdx => {
        mergedRecord = mergeRecords(mergedRecord, data[dupIdx]);
        processed.add(dupIdx);
        duplicatesFound++;
      });
      result.push(mergedRecord);
    } else {
      result.push(record);
    }
    
    processed.add(index);
  });
  
  return { data: result, duplicatesFound };
};
