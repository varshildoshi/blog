import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Observable } from 'rxjs';
import { BlogEntry } from '../model/blog.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserIsAuthorGuard } from '../guards/userIsAuthor-guard';

@Controller('blog-entries')
export class BlogController {

    BLOG_ENTRIES_URL = 'http://localhost:3000/blog-entries';

    constructor(
        private blogService: BlogService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
        const user = req.user;
        return this.blogService.create(user, blogEntry);
    }

    // @Get()
    // findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
    //     if (userId == null) {
    //         return this.blogService.findAllBlog();
    //     } else {
    //         return this.blogService.findByUser(userId);
    //     }
    // }

    @Get('')
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: this.BLOG_ENTRIES_URL
        })
    }

    @Get('user/:user')
    indexByUser(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Param('user') userId: number
    ) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateByUser({
            limit: Number(limit),
            page: Number(page),
            route: this.BLOG_ENTRIES_URL
        }, Number(userId))
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<BlogEntry> {
        return this.blogService.findOneBlog(id);
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Put(':id')
    updateBlog(@Param('id') id: number, @Body() blogEntry: BlogEntry): Observable<BlogEntry> {
        return this.blogService.updateBlog(Number(id), blogEntry);
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Delete(':id')
    deleteBlog(@Param('id') id: number): Observable<any> {
        return this.blogService.deleteBlog(id);
    }
}
