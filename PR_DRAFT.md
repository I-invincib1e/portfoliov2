# Pull Request: Update Social Media Links

## 📝 PR Title
```
chore: Update GitHub and Instagram social media links
```

## 📋 PR Description

### Summary
Updated GitHub and Instagram profile links in the site configuration to reflect the correct social media handles.

### Changes Made
- ✅ Updated GitHub profile URL from `Neorex80` to `I-invincib1e`
- ✅ Updated Instagram profile URL from `k_rishi.exe` to `i_invincib1e`

### Files Modified
- `src/config/siteConfig.ts` - Updated social media links in the `siteConfig.social` object

### Details
The social media links in the portfolio configuration have been updated to point to the correct profiles:

**Before:**
- GitHub: `https://github.com/Neorex80`
- Instagram: `https://www.instagram.com/k_rishi.exe/`

**After:**
- GitHub: `https://github.com/I-invincib1e`
- Instagram: `https://www.instagram.com/i_invincib1e/`

### Testing Checklist
- [x] Verified links are correctly formatted
- [x] Confirmed configuration file syntax is valid
- [x] No breaking changes to existing functionality

### Type of Change
- [x] Configuration update
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

### Impact
This is a straightforward configuration change with no impact on functionality or UI. The updated links will be reflected in all components that reference `siteConfig.social.github` and `siteConfig.social.instagram`.

### Related Issues
Closes: #[issue-number] (if applicable)

---

**Reviewer Notes:** 
- This PR only updates static configuration values
- No code logic changes
- Safe to merge without additional testing
