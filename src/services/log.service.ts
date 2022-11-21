const Console = {
    logMessage: (data: string | object) => console.log(new Date().toISOString(), '>', data),
    logError: (error: string | object) => console.error('Error -', new Date().toISOString(), '>', error),
    logWarn: (data: string | object) => console.error('Warning -', new Date().toISOString(), '>', data),
};

export default Console;

