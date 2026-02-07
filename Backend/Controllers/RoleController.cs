using Backend.Authorization;
using Backend.Enums;
using Backend.Models;
using Backend.Models.Dto.Role;
using Backend.Services.Role;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class RoleController : ControllerBase
{
    private readonly RoleService _roleService;
    
    public RoleController(RoleService roleService)
    {
        _roleService = roleService;
    }

    [Authorize(Policy = "CanManageRoles")]
    [HttpGet("get-{userId}")]
    public async Task<IActionResult> GetRoleByUserId(string userId)
    {
        var roles = await _roleService.GetUserRole(userId);
        if(roles.Count != 1)
            return Conflict("Roles are corrupted on this User");
        
        return Ok(roles);
    }

    [Authorize(Policy = "CanManageRoles")]
    [HttpPost("repair-{userId}")]
    public async Task<IActionResult> RepairUserId(string userId)
    {
        var roles = await _roleService.GetUserRole(userId);
        if (roles.Count == 1)
            return Conflict("User has one role");

        await _roleService.ResetUserRoles(userId);
        await _roleService.AddRoleToUser(userId, Roles.User);
        
        return Ok("User roles has been repaired");
    }

    [Authorize(Policy = "CanManageRoles")]
    [HttpPut("add-{userId}")]
    public async Task<IActionResult> AddRoleByUserId(string userId, RoleDto roleDto)
    {
        var roles = await _roleService.GetUserRole(userId);
        if(roles.Count > 0)
            return Conflict("User has more than one role");
        
        var result = await _roleService.AddRoleToUser(userId, roleDto.Name);
        if (!result)
            return BadRequest("User has role");
        return Ok("Role has been added");
    }

    [Authorize(Policy = "CanManageRoles")]
    [HttpPatch("replace-{userId}")]
    public async Task<IActionResult> ReplaceRoleByUserId(string userId, RoleDto roleDto)
    {
        var roles = await _roleService.GetUserRole(userId);
        if(roles.Count != 1)
            return Conflict("User has more than one role");
        
        var result = await _roleService.ReplaceUserRole(userId, roleDto.Name);
        if (!result)
            return BadRequest("User has role");
        return Ok("Role has been added");
    }
}