export const initiateOptions = (data) => {
    let { host, scanType, maxRetries, hostTimeout, port } = data
    const options = []

    if (scanType) { options.push(scanType) }

    if (maxRetries) { options.push(...["--max-retries", maxRetries]) }

    if (hostTimeout) { options.push(...["--host-timeout", hostTimeout]) }

    if (port) { options.push(...["-p", port]) }

    options.push(host)


    return options
}