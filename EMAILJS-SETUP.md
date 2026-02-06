# EmailJS Setup Instructions for Brelinx Contact Form

## ✅ What's Already Done

1. **EmailJS SDK Added** - Script loaded in index.html
2. **Public Key Initialized** - VNaptzurXMluqfUZq
3. **Contact Form Updated** - Now uses EmailJS instead of WhatsApp redirect
4. **Success/Error Messages** - User sees confirmation without leaving page
5. **Loading State** - Button shows spinner while sending

## 🔧 What You Need to Do

### Step 1: Create EmailJS Template

1. Go to https://dashboard.emailjs.com/
2. Log in with your account
3. Click on **"Email Templates"** in the left sidebar
4. Click **"Create New Template"**
5. Give it a name like "Brelinx Contact Form"

### Step 2: Set Up Template Content

**Template Settings:**
- **To Email**: Your email address (where you want to receive messages)
- **From Name**: {{name}}
- **From Email**: service@brelinx.com (or your domain email)
- **Reply To**: {{email}}
- **Subject**: New Contact Form Submission from {{name}}

**Template HTML Body:**
Paste this HTML code:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #2d8a5f; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
    </div>
    
    <div style="padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p style="font-size: 14px; color: #4a4a4a; margin-bottom: 20px;">
                A message from <strong>{{name}}</strong> has been received. Kindly respond at your earliest convenience.
            </p>
            
            <div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: #dee2e6;">
                <table role="presentation" style="width: 100%;">
                    <tr>
                        <td style="vertical-align: top; width: 60px;">
                            <div style="padding: 6px 10px; margin: 0 10px; background-color: #e8f5f1; border-radius: 5px; font-size: 26px;" role="img">
                                👤
                            </div>
                        </td>
                        <td style="vertical-align: top;">
                            <div style="color: #2c3e50; font-size: 16px; margin-bottom: 5px;">
                                <strong>{{name}}</strong>
                            </div>
                            <div style="color: #95a5a6; font-size: 13px; margin-bottom: 10px;">
                                📧 {{email}}
                            </div>
                            <div style="color: #95a5a6; font-size: 13px; margin-bottom: 15px;">
                                🕒 {{time}}
                            </div>
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #2d8a5f;">
                                <p style="font-size: 15px; color: #2c3e50; margin: 0; line-height: 1.6;">
                                    {{message}}
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f5f1; border-radius: 5px;">
                <p style="margin: 0; font-size: 13px; color: #2d8a5f;">
                    💡 <strong>Quick Action:</strong> Reply directly to {{email}} to respond to this inquiry.
                </p>
            </div>
        </div>
    </div>
    
    <div style="background-color: #2c3e50; padding: 15px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #95a5a6;">
            Powered by <strong style="color: #2d8a5f;">Brelinx</strong>
        </p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #7f8c8d;">
            Professional IT Services & Web Development
        </p>
    </div>
</div>
```

### Step 3: Configure Template Variables

Make sure these variables are set in your template:
- `{{name}}` - Sender's name
- `{{email}}` - Sender's email
- `{{message}}` - The message content
- `{{time}}` - Timestamp of submission

### Step 4: Get Your Template ID

1. After saving the template, you'll see a **Template ID** (looks like: template_xxxxxxx)
2. Copy this Template ID

### Step 5: Update JavaScript

Open `js/index.js` and find this line (around line 195):

```javascript
emailjs.send('service_swdllg9', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace `'YOUR_TEMPLATE_ID'` with your actual Template ID:

```javascript
emailjs.send('service_swdllg9', 'template_xxxxxxx', templateParams)
```

### Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. You should see:
   - Loading spinner
   - Success message: "Message sent successfully! We'll get back to you soon."
   - Email arrives in your inbox

## 📧 Your EmailJS Credentials

- **Service ID**: service_swdllg9
- **Public Key**: VNaptzurXMluqfUZq
- **Private Key**: HOgJPdrA56CuKB_fEp0wq (keep this secret!)
- **Template ID**: [You need to get this from EmailJS dashboard]

## 🎨 Email Template Features

✅ Professional Brelinx branding
✅ "Powered by Brelinx" footer
✅ Sender's name, email, and timestamp
✅ Message displayed in styled box
✅ Quick action reminder to reply
✅ Mobile-responsive design
✅ Matches your brand colors (#2d8a5f)

## 🔍 Troubleshooting

### Form not sending?
1. Check browser console for errors (F12)
2. Verify Template ID is correct in js/index.js
3. Make sure EmailJS service is active
4. Check your EmailJS dashboard for quota limits

### Not receiving emails?
1. Check spam folder
2. Verify "To Email" in template settings
3. Check EmailJS dashboard for delivery status
4. Ensure your email service allows emails from EmailJS

### Success message not showing?
1. Check if formStatus element exists in HTML
2. Verify CSS styles are loaded
3. Check browser console for JavaScript errors

## 📝 What Happens Now

**Before:**
- User fills form → Redirected to WhatsApp → Annoying experience

**After:**
- User fills form → Sees loading spinner → Gets success message → Stays on page
- You receive professional email with all details
- User can continue browsing your site

## 🚀 Benefits

✅ Professional experience (no WhatsApp redirect)
✅ Email record of all inquiries
✅ User stays on your website
✅ Better conversion rates
✅ Branded email template
✅ Automatic timestamp tracking

---

**Need Help?** Check EmailJS documentation: https://www.emailjs.com/docs/
