
export const resetPasswordTemplate = (resetToken: string):string=>{
    return `<p>Dear User,</p>
    <p>We received a request to reset your password for your COREMS account.</p>
    <p>Please use the following link to reset your password:</p>
    <p><a href="https://6602790774004eb217c7fe2e--neon-maamoul-15f61b.netlify.app?token=${resetToken}">Reset Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best Regards,</p>
    <p>COREMS Support</p>
    <p>Vaibhav Kamble</p>`
}
export const loginCrediantialTemplate = (email:string,password:string):string=>{
    return `<p>Dear User,</p>
    <p>Your login credentials for accessing COREMS have been successfully created. Please find your login details below:</p>
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
    <p>We recommend that you change your password after logging in for the first time for security purposes.</p>
    <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
    <p>Best Regards,</p>
    <p>COREMS Support</p>`
}
