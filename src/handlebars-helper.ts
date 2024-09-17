import * as hbs from 'hbs';

hbs.registerHelper('eq', function (a: any, b: any) {
  return a === b;
});

hbs.registerHelper('lt', (a: any, b: any) => a < b);
hbs.registerHelper('gt', (a: any, b: any) => a > b);

hbs.registerHelper('add', (a: number, b: number) => a + b);
hbs.registerHelper('subtract', (a: any, b: any) => a - b);

hbs.registerHelper('json', function (context: any) {
  return JSON.stringify(context);
});

hbs.registerHelper('paginationRange', function (totalPages: number, currentPage: number, limit = 5) {
  const pages = [];
  const halfLimit = Math.floor(limit / 2);

  let startPage = Math.max(1, currentPage - halfLimit);
  let endPage = Math.min(totalPages, startPage + limit - 1);

  startPage = Math.max(1, endPage - limit + 1);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('...');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return pages;
});

hbs.registerHelper('renderPagination', function(currentPage: number, totalPages: number) {
  const pages = hbs.handlebars.helpers['paginationRange'](totalPages, currentPage, 5);
  let result = '<nav aria-label="Pagination" class="w-full flex items-center justify-center p-4 overflow-hidden">';

  if (currentPage > 1) {
    result += `
      <a href="?page=${Number(currentPage) - 1}"
         class="inline-flex mr-[20px] w-1/4 items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-300 rounded-l-md">
         <svg width='24' height='24' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path
           fillRule='evenodd'
           clipRule='evenodd'
           d='M1.70868 4.00064H11.5062C11.7825 4.00064 12.0064 4.2245 12.0064 4.50064C12.0064 4.77678 11.7825 5.00064 11.5062 5.00064H1.70868L4.85713 8.14664C5.05273 8.34215 5.05273 8.65913 4.85713 8.85464C4.66153 9.05015 4.3444 9.05015 4.1488 8.85464L0.14696 4.85464C0.05288 4.76084 0 4.63347 0 4.50064C0 4.36781 0.05288 4.24044 0.14696 4.14664L4.1488 0.146639C4.27533 0.0201694 4.45975 -0.0292206 4.6326 0.0170694C4.80544 0.0633594 4.94045 0.198309 4.98676 0.371069C5.03307 0.543829 4.98366 0.728169 4.85713 0.854639L1.70868 4.00064Z'
           fill='#000000'
         />
       </svg>
      </a>
    `;
  } else {
    result += `
      <span class="inline-flex mr-[20px] w-1/4 items-center px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-l-md cursor-default">
      <svg width='24' height='24' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.70868 4.00064H11.5062C11.7825 4.00064 12.0064 4.2245 12.0064 4.50064C12.0064 4.77678 11.7825 5.00064 11.5062 5.00064H1.70868L4.85713 8.14664C5.05273 8.34215 5.05273 8.65913 4.85713 8.85464C4.66153 9.05015 4.3444 9.05015 4.1488 8.85464L0.14696 4.85464C0.05288 4.76084 0 4.63347 0 4.50064C0 4.36781 0.05288 4.24044 0.14696 4.14664L4.1488 0.146639C4.27533 0.0201694 4.45975 -0.0292206 4.6326 0.0170694C4.80544 0.0633594 4.94045 0.198309 4.98676 0.371069C5.03307 0.543829 4.98366 0.728169 4.85713 0.854639L1.70868 4.00064Z'
        fill='#BDC9D3'
      />
    </svg>
      </span>
    `;
  }

  result += '<div class="flex items-center space-x-2">';
  pages.forEach((page) => {    
    if (page === '...') {
      result += '<span class="text-xs text-gray-500">...</span>';
    } else if (page == currentPage) {
      result += `
      <div class="px-3 py-2 bg-blue-500 rounded-md text-white">
        <p class=" text-sm font-bold !text-red-500 !bg-blue-600 rounded-md">
          ${page}
        </p>
      </div>
      `;
    } else {
      result += `
        <a href="?page=${page}"
           class="px-3 py-2 text-sm font-semibold text-gray-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-300 rounded-md">
          ${page}
        </a>
      `;
    }
  });
  result += '</div>';

  if (currentPage < totalPages) {
    result += `
      <a href="?page=${Number(currentPage) + 1}"
         class="inline-flex mr-[20px] w-1/4 items-center justify-end px-4 py-2 text-sm font-semibold text-gray-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-300 rounded-r-md">
        <svg width='24' height='24' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path
           fillRule='evenodd'
           clipRule='evenodd'
           d='M10.2977 5.00063H0.50023C0.22396 5.00063 0 4.77677 0 4.50063C0 4.22449 0.22396 4.00063 0.50023 4.00063H10.2977L7.14929 0.854632C6.95369 0.659123 6.95369 0.342142 7.14929 0.146633C7.34489 -0.0488775 7.66202 -0.0488775 7.85762 0.146633L11.8595 4.14663C11.9535 4.24043 12.0064 4.3678 12.0064 4.50063C12.0064 4.63346 11.9535 4.76083 11.8595 4.85463L7.85762 8.85463C7.66202 9.05014 7.34489 9.05014 7.14929 8.85463C6.95369 8.65912 6.95369 8.34214 7.14929 8.14663L10.2977 5.00063Z'
           fill='#000000'
         />
       </svg>
      </a>
    `;
  } else {
    result += `
      <span class="inline-flex mr-[20px] w-1/4 justify-end items-center px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-r-md cursor-default">
      <svg width='24' height='24' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.2977 5.00063H0.50023C0.22396 5.00063 0 4.77677 0 4.50063C0 4.22449 0.22396 4.00063 0.50023 4.00063H10.2977L7.14929 0.854632C6.95369 0.659123 6.95369 0.342142 7.14929 0.146633C7.34489 -0.0488775 7.66202 -0.0488775 7.85762 0.146633L11.8595 4.14663C11.9535 4.24043 12.0064 4.3678 12.0064 4.50063C12.0064 4.63346 11.9535 4.76083 11.8595 4.85463L7.85762 8.85463C7.66202 9.05014 7.34489 9.05014 7.14929 8.85463C6.95369 8.65912 6.95369 8.34214 7.14929 8.14663L10.2977 5.00063Z'
        fill='#BDC9D3'
      />
    </svg>
      </span>
    `;
  }

  result += '</nav>';
  return new hbs.handlebars.SafeString(result);
});
